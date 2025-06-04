"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function CodeWindow(props : any) {
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
              <h3 className="text-sm font-medium text-gray-700">
                HTML/CSS Code
              </h3>
            </div>
            <CardContent className="p-0 h-full">
              <textarea
                value={props.htmlCssCode}
                onChange={(e) => props.setHtmlCssCode(e.target.value)}
                className="w-full h-full p-4 font-mono text-sm border-0 resize-none focus:outline-none bg-gray-50"
                placeholder="Enter your complete HTML/CSS code here..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="UI" className="flex-1 mt-4 h-full">
          <Card className="h-full w-full">
            <div className="border-b px-4 py-2 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700">
                Landing Page Preview
              </h3>
            </div>
            <CardContent className="p-4 h-full">
              <div className="w-full h-full border border-gray-200 rounded-lg overflow-auto bg-white">
                <iframe
                  srcDoc={props.htmlCssCode}
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
