import type React from "react"
/**
 * Scrolls the page to the specified section
 * @param sectionId The ID of the section to scroll to
 */
export function scrollToSection(sectionId: string | null): void {
  if (!sectionId) {
    // If no section ID and window exists, scroll to top
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    return
  }

  if (typeof document === 'undefined') return;
  
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}

/**
 * Utility function to handle navigation link clicks
 * @param e The click event
 * @param href The href attribute of the link
 * @param callback Optional callback to execute after scrolling
 */
export function handleNavLinkClick(e: React.MouseEvent<HTMLAnchorElement>, href: string, callback?: () => void): void {
  e.preventDefault()

  // Extract the section ID from the href
  const sectionId = href.includes("#") ? href.split("#")[1] : null

  scrollToSection(sectionId)

  if (callback) {
    callback()
  }
}
