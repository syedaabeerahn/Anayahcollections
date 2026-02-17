"use client";

import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from './ui/button';
import { X, Crop as CropIcon } from 'lucide-react';

interface ImageCropperProps {
    imageSrc: string;
    onCropComplete: (croppedImage: Blob) => void;
    onCancel: () => void;
}

export default function ImageCropper({ imageSrc, onCropComplete, onCancel }: ImageCropperProps) {
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const imgRef = useRef<HTMLImageElement>(null);

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        // Initial crop: 80% of the image
        const initialCrop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 80,
                },
                1, // Default aspect ratio 1:1, but user can change it if we remove this
                width,
                height
            ),
            width,
            height
        );
        setCrop(initialCrop);
    }

    async function handleCropSave() {
        if (imgRef.current && completedCrop) {
            const canvas = document.createElement('canvas');
            const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
            const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
            canvas.width = completedCrop.width;
            canvas.height = completedCrop.height;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                ctx.drawImage(
                    imgRef.current,
                    completedCrop.x * scaleX,
                    completedCrop.y * scaleY,
                    completedCrop.width * scaleX,
                    completedCrop.height * scaleY,
                    0,
                    0,
                    completedCrop.width,
                    completedCrop.height
                );

                canvas.toBlob((blob) => {
                    if (blob) {
                        onCropComplete(blob);
                    }
                }, 'image/jpeg', 0.9);
            }
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <CropIcon className="h-5 w-5 text-primary" />
                        <h3 className="font-bold text-lg text-gray-900 font-serif">Crop Product Image</h3>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full hover:bg-gray-200">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-auto p-8 flex justify-center bg-gray-100/30">
                    <ReactCrop
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                    >
                        <img
                            ref={imgRef}
                            src={imageSrc}
                            alt="Crop me"
                            onLoad={onImageLoad}
                            crossOrigin="anonymous"
                            className="max-w-full max-h-[60vh] rounded-md shadow-sm"
                        />
                    </ReactCrop>
                </div>

                <div className="p-6 border-t bg-white flex justify-end gap-3">
                    <Button variant="outline" onClick={onCancel} className="rounded-full px-6">
                        Cancel
                    </Button>
                    <Button onClick={handleCropSave} className="rounded-full px-8 bg-primary hover:bg-primary/90">
                        Crop & Upload
                    </Button>
                </div>
            </div>
        </div>
    );
}
