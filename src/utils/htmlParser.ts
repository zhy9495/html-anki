import { OpmlNode } from '../types';

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function extractFormattedText(element: Element): { plainText: string, formattedText: string } {
  return {
    plainText: element.textContent || '',
    formattedText: element.innerHTML
  };
}

export function parseHtmlFile(htmlContent: string): OpmlNode[] {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Find all top-level list items that contain month information
    const monthNodes = Array.from(doc.querySelectorAll('.node-list > .node'));
    
    return monthNodes.map(monthNode => {
      // Get the month title (front of the card)
      const monthTitle = monthNode.querySelector('.content');
      const { plainText: monthText, formattedText: monthFormatted } = extractFormattedText(monthTitle!);
      
      // Get all exam entries under this month (back of the card)
      const examNodes = Array.from(monthNode.querySelectorAll('.children .node'));
      const children = examNodes.map(examNode => {
        const examContent = examNode.querySelector('.content');
        const { plainText: examText, formattedText: examFormatted } = extractFormattedText(examContent!);
        
        return {
          id: generateId(),
          text: examText,
          formattedText: examFormatted,
          children: []
        };
      });
      
      return {
        id: generateId(),
        text: monthText,
        formattedText: monthFormatted,
        children
      };
    });
  } catch (error) {
    console.error('Error parsing HTML:', error);
    throw new Error('Failed to parse HTML file');
  }
}