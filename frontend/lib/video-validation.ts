/**
 * Validates a video file for format, size, resolution, and aspect ratio
 * @param file The video file to validate
 * @returns A promise that resolves to an object with validation results
 */
export async function validateVideoFile(file: File): Promise<{
  isValid: boolean
  errors: string[]
}> {
  const errors: string[] = []

  // Check file type
  if (file.type !== "video/mp4") {
    errors.push("Video must be in MP4 format (H.264)")
  }

  // Check file size (500MB max)
  const MAX_SIZE = 500 * 1024 * 1024 // 500MB in bytes
  if (file.size > MAX_SIZE) {
    errors.push("Video file must be less than 500MB")
  }

  // Skip resolution checks on server side
  if (typeof document === 'undefined') {
    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Check resolution and aspect ratio
  try {
    const { width, height, aspectRatio } = await getVideoMetadata(file)

    // Check if resolution is at least 720p (1280x720)
    // if (width < 1280 || height < 720) {
    //   errors.push("Video must have a minimum resolution of 720p (1280x720)")
    // }

    // Check aspect ratio (should be 16:9)
    const expectedAspectRatio = 16 / 9
    if (Math.abs(aspectRatio - expectedAspectRatio) > 0.1) {
      // Allow small deviation
      errors.push("Video must have a 16:9 aspect ratio")
    }
  } catch (error) {
    errors.push("Error validating video resolution and aspect ratio")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Gets metadata from a video file
 * @param file The video file
 * @returns A promise that resolves to an object with video metadata
 */
function getVideoMetadata(file: File): Promise<{
  width: number
  height: number
  duration: number
  aspectRatio: number
}> {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      // Cannot validate on server side, return default values
      resolve({
        width: 1280,
        height: 720,
        duration: 0,
        aspectRatio: 16/9,
      });
      return;
    }
    
    const video = document.createElement("video")
    video.preload = "metadata"

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src)

      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration,
        aspectRatio: video.videoWidth / video.videoHeight,
      })
    }

    video.onerror = () => {
      URL.revokeObjectURL(video.src)
      reject(new Error("Error loading video metadata"))
    }

    video.src = URL.createObjectURL(file)
  })
}

/**
 * Validates a PDF file for format and size
 * @param file The PDF file to validate
 * @returns A validation result object
 */
export function validateScriptFile(file: File): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Check file type
  if (file.type !== "application/pdf") {
    errors.push("Script must be in PDF format")
  }

  // Check file size (5MB max)
  const MAX_SIZE = 5 * 1024 * 1024 // 5MB in bytes
  if (file.size > MAX_SIZE) {
    errors.push("Script file must be less than 5MB")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Validate video dimensions
const validateDimensions = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      // Cannot validate on server side
      resolve(true);
      return;
    }
    
    const video = document.createElement("video")
    
    video.onloadedmetadata = () => {
      // Check if dimensions meet requirements
      const isValid = video.videoWidth >= 1280 && video.videoHeight >= 720
      URL.revokeObjectURL(video.src)
      resolve(isValid)
    }
    
    video.onerror = () => {
      URL.revokeObjectURL(video.src)
      reject(new Error("Failed to load video metadata"))
    }
    
    video.src = URL.createObjectURL(file)
  })
}
