"use client"
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function CodeWindow() {
  const [htmlCssCode, setHtmlCssCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 100px 20px;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 20px;
            font-weight: bold;
        }
        
        .hero p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            opacity: 0.9;
        }
        
        .cta-btn {
            background: #fff;
            color: #667eea;
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .cta-btn:hover {
            background: #f0f0f0;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <section class="hero">
        <h1>Welcome to the Future</h1>
        <p>Create amazing landing pages with our AI-powered editor</p>
        <button class="cta-btn">Get Started</button>
    </section>
</body>
</html>`);

  return (
    <div className="h-full w-full">
      <Tabs defaultValue="Code" className="h-full w-full flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Code">HTML/CSS Editor</TabsTrigger>
          <TabsTrigger value="UI">Live Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="Code" className="flex-1 mt-4 h-full">
          <Card className="h-full w-full">
            <div className="border-b px-4 py-2 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700">HTML/CSS Code</h3>
            </div>
            <CardContent className="p-0 h-full">
              <textarea
                value={htmlCssCode}
                onChange={(e) => setHtmlCssCode(e.target.value)}
                className="w-full h-full p-4 font-mono text-sm border-0 resize-none focus:outline-none bg-gray-50"
                placeholder="Enter your complete HTML/CSS code here..."
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="UI" className="flex-1 mt-4 h-full">
          <Card className="h-full w-full">
            <div className="border-b px-4 py-2 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700">Landing Page Preview</h3>
            </div>
            <CardContent className="p-4 h-full">
              <div className="w-full h-full border border-gray-200 rounded-lg overflow-auto bg-white">
                <iframe
                  srcDoc={htmlCssCode}
                  className="w-full h-full border-0"
                  title="Landing Page Preview"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}