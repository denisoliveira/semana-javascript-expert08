/**
 * @type {HTMLCanvasElement}
 */
let _canvas = {}
let _context = {}

export default class CanvasRenderer {
  /**
   * 
   * @param {VideoFrame} frame 
   */
  static draw(frame) {
    const { displayWidth, displayHeight} = frame

    _canvas.width = displayWidth
    _canvas.height = displayHeight
    
    _context.drawImage(
      frame, // Image Source
      0, // X
      0, // Y
      displayWidth, // Width
      displayHeight, // Height
    )
    frame.close()
  }

  /**
   * 
   * @param {HTMLCanvasElement} canvas 
   * @returns 
   */
  static getRenderer(canvas) {
    _canvas = canvas
    _context = canvas.getContext('2d')

    const renderer = this
    let pendingFrame = null
    
    return frame => {
      const renderAnimationFrame = () => {
        renderer.draw(pendingFrame)
        pendingFrame = null
      }

      if (!pendingFrame) {
        requestAnimationFrame(renderAnimationFrame)
      }
      else {
        pendingFrame.close()
      }

      pendingFrame = frame;
    }
  }
}