
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlus, X, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductImageUploaderProps {
  productImages: string[];
  setProductImages: React.Dispatch<React.SetStateAction<string[]>>;
  mainImage: string | null;
  setMainImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProductImageUploader: React.FC<ProductImageUploaderProps> = ({
  productImages,
  setProductImages,
  mainImage,
  setMainImage
}) => {
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // In a real implementation, you would upload to a server
    // For now, we'll just create object URLs for preview
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    
    setProductImages(prev => [...prev, ...newImages]);
    
    // Set the first uploaded image as main image if none exists
    if (!mainImage && newImages.length > 0) {
      setMainImage(newImages[0]);
    }

    toast({
      title: "Images uploaded",
      description: `${files.length} images have been added to the gallery.`,
    });
  };

  const removeImage = (imageUrl: string) => {
    setProductImages(prev => prev.filter(img => img !== imageUrl));
    
    // If we removed the main image, set a new one or null
    if (mainImage === imageUrl) {
      const remainingImages = productImages.filter(img => img !== imageUrl);
      setMainImage(remainingImages.length > 0 ? remainingImages[0] : null);
    }
  };

  const setAsMainImage = (imageUrl: string) => {
    setMainImage(imageUrl);
    toast({
      title: "Main image updated",
      description: "Selected image has been set as the main product image.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          id="product-images"
        />
        <Label 
          htmlFor="product-images" 
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
        >
          <Upload size={20} />
          <span>Upload Images</span>
        </Label>
        <p className="text-sm text-gray-500">
          You can upload multiple images at once
        </p>
      </div>

      {/* Gallery Preview */}
      {productImages.length > 0 && (
        <div>
          <p className="font-medium mb-2">Gallery ({productImages.length} images)</p>
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((img, index) => (
              <div 
                key={index} 
                className={`relative rounded-md overflow-hidden border-2 ${
                  mainImage === img ? 'border-gold' : 'border-gray-200'
                }`}
              >
                <img 
                  src={img} 
                  alt={`Product preview ${index + 1}`} 
                  className="w-full h-32 object-cover" 
                />
                <div className="absolute top-0 right-0 flex space-x-1 m-1">
                  {mainImage !== img && (
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="h-6 w-6" 
                      onClick={() => setAsMainImage(img)}
                      title="Set as main image"
                    >
                      <ImagePlus size={14} />
                    </Button>
                  )}
                  <Button 
                    size="icon" 
                    variant="destructive" 
                    className="h-6 w-6" 
                    onClick={() => removeImage(img)}
                    title="Remove image"
                  >
                    <X size={14} />
                  </Button>
                </div>
                {mainImage === img && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gold text-white text-xs px-2 py-1 text-center">
                    Main Image
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageUploader;
