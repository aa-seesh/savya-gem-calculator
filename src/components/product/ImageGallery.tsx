
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
  const [currentImage, setCurrentImage] = useState<string>(images[0]);
  const [openImageDialog, setOpenImageDialog] = useState(false);

  return (
    <div className="space-y-4">
      <div 
        className="aspect-square bg-cream rounded-lg overflow-hidden border cursor-pointer"
        onClick={() => setOpenImageDialog(true)}
      >
        <img 
          src={currentImage} 
          alt={productName}
          className="w-full h-full object-contain object-center p-4"
        />
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {images.map((image: string, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentImage(image)}
            className={`
              aspect-square rounded-md overflow-hidden border-2 
              ${currentImage === image ? 'border-gold shadow-md' : 'border-gray-200'}
            `}
          >
            <img 
              src={image} 
              alt={`${productName} view ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Image Dialog */}
      <Dialog open={openImageDialog} onOpenChange={setOpenImageDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{productName}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-square">
            <img 
              src={currentImage} 
              alt={productName}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-6 gap-2 mt-4">
            {images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImage(image)}
                className={`
                  aspect-square rounded-md overflow-hidden border-2 
                  ${currentImage === image ? 'border-gold shadow-md' : 'border-gray-200'}
                `}
              >
                <img 
                  src={image} 
                  alt={`${productName} view ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
