import { convert } from 'xml-js';
import { OpmlNode } from '../types';

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function extractFormattedText(text: string): { plainText: string, formattedText: string } {
  // In a real implementation, we would parse and extract formatting here
  // This is a simplified version that assumes the text might contain HTML
  
  // For now, we'll just return the same text as both plain and formatted
  return {
    plainText: text,
    formattedText: text
  };
}

export function parseOpmlFile(xmlContent: string): OpmlNode[] {
  try {
    const result = convert.xml2js(xmlContent, { compact: true });
    
    if (!result.opml || !result.opml.body || !result.opml.body.outline) {
      throw new Error('Invalid OPML structure');
    }
    
    const outlines = Array.isArray(result.opml.body.outline) 
      ? result.opml.body.outline 
      : [result.opml.body.outline];
    
    return outlines.map(parseOutline);
  } catch (error) {
    console.error('Error parsing OPML:', error);
    throw new Error('Failed to parse OPML file');
  }
}

function parseOutline(outline: any): OpmlNode {
  const text = outline._attributes?.text || '';
  const { plainText, formattedText } = extractFormattedText(text);
  
  const children = outline.outline
    ? (Array.isArray(outline.outline) 
        ? outline.outline 
        : [outline.outline]
      ).map(parseOutline)
    : [];
  
  return {
    id: generateId(),
    text: plainText,
    formattedText,
    children
  };
}