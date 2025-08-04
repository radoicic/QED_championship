// Image optimization utility for background images

export const optimizeBackgroundImage = (imagePath: string, maxSizeKB: number = 500) => {
  // This function provides guidance for image optimization
  return {
    originalPath: imagePath,
    optimizedPath: imagePath.replace('.png', '-optimized.jpg'),
    recommendations: [
      'Convert PNG to JPG for better compression',
      'Resize to 1920x1080 or smaller',
      'Use 70-80% quality for JPG',
      'Target file size: under 500KB',
      'Use tools like TinyPNG or ImageOptim'
    ]
  };
};

export const getImageSizeInfo = async (imagePath: string): Promise<{ size: number; sizeKB: number; optimized: boolean }> => {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    const size = blob.size;
    const sizeKB = Math.round(size / 1024);
    
    return {
      size,
      sizeKB,
      optimized: sizeKB < 500
    };
  } catch (error) {
    return {
      size: 0,
      sizeKB: 0,
      optimized: false
    };
  }
};

export const createOptimizedBackground = (color1: string = '#4C1D95', color2: string = '#1E40AF') => {
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
}; 