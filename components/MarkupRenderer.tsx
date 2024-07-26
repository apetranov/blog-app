// components/MarkupRenderer.tsx
import React from 'react';
import { marked } from 'marked';
import parse, { domToReact } from 'html-react-parser';
import DOMPurify from 'dompurify';

interface MarkupRendererProps {
  markupString: string;
}

type CustomRenderers = {
    [key: string]: (node: any) => React.ReactElement;
  };

  const customRenderers: CustomRenderers = {
    h1: (node: any) => <h1 className="text-2xl md:text-4xl font-bold mb-4">{domToReact(node.children)}</h1>,
    h2: (node: any) => <h2 className="text-3xl font-semibold mb-3">{domToReact(node.children)}</h2>,
    p: (node: any) => <p className="mb-4 text-lg">{domToReact(node.children)}</p>,
    strong: (node: any) => <strong className="font-bold">{domToReact(node.children)}</strong>,
    em: (node: any) => <em className="italic">{domToReact(node.children)}</em>,
    a: (node: any) => <a className='text-indigo-600 underline'>{domToReact(node.children)}</a>,
    li: (node: any) => <li className="mb-2 pl-4 list-disc">{domToReact(node.children)}</li>,
    ul: (node: any) => <ul className="list-inside list-disc">{domToReact(node.children)}</ul>,
    ol: (node: any) => <ol className="list-inside list-decimal">{domToReact(node.children)}</ol>,
    img: (node: any) => <img className='max-w-sm mx-auto' {...node.attribs} />
    // Add more custom renderers as needed
  };

const MarkupRenderer: React.FC<MarkupRendererProps> = ({ markupString }) => {
  const rawHtmlString = marked(markupString).toString(); // Converts Markdown to HTML
  const cleanHtmlString = DOMPurify.sanitize(rawHtmlString); // Sanitizes the HTML string
  const reactElement = parse(cleanHtmlString, {
    replace: (domNode) => {
      // Use custom renderers if they exist
      if (domNode.type === 'tag' && customRenderers[domNode.name]) {
        return customRenderers[domNode.name](domNode);
      }
    },
  }); // Parses the HTML string to React elements

  return <div>{reactElement}</div>; // Renders the React elements
};

export default MarkupRenderer;
