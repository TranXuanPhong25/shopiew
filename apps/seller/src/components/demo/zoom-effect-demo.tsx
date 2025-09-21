"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  CircularZoomEffect, 
  PageZoomTransition, 
  CircularReveal, 
  ZoomEffect 
} from "@/components/effects";

export default function ZoomEffectDemo() {
  const [activeEffect, setActiveEffect] = useState<string>("circular");
  const [isVisible, setIsVisible] = useState(true);

  const resetAnimation = () => {
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 100);
  };

  const demoContent = (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-lg text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Hiệu ứng Zoom</h2>
      <p className="text-lg">
        Đây là demo hiệu ứng zoom từ trung tâm màn hình với mask hình tròn
      </p>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white/20 p-4 rounded">Box 1</div>
        <div className="bg-white/20 p-4 rounded">Box 2</div>
        <div className="bg-white/20 p-4 rounded">Box 3</div>
        <div className="bg-white/20 p-4 rounded">Box 4</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Demo Hiệu Ứng Zoom
        </h1>
        
        {/* Control Panel */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Chọn loại hiệu ứng:</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            <Button
              onClick={() => setActiveEffect("circular")}
              variant={activeEffect === "circular" ? "default" : "outline"}
            >
              Circular Reveal
            </Button>
            <Button
              onClick={() => setActiveEffect("center")}
              variant={activeEffect === "center" ? "default" : "outline"}
            >
              Center Zoom
            </Button>
            <Button
              onClick={() => setActiveEffect("scale")}
              variant={activeEffect === "scale" ? "default" : "outline"}
            >
              Scale Effect
            </Button>
            <Button
              onClick={() => setActiveEffect("combined")}
              variant={activeEffect === "combined" ? "default" : "outline"}
            >
              Combined Effect
            </Button>
          </div>
          <Button onClick={resetAnimation} className="w-full">
            Reset Animation
          </Button>
        </div>

        {/* Effect Demo Area */}
        <div className="h-96 relative">
          {isVisible && (
            <>
              {activeEffect === "circular" && (
                <CircularReveal duration={1.5} className="h-full">
                  {demoContent}
                </CircularReveal>
              )}
              
              {activeEffect === "center" && (
                <ZoomEffect variant="center" duration={1.2} className="h-full">
                  {demoContent}
                </ZoomEffect>
              )}
              
              {activeEffect === "scale" && (
                <ZoomEffect variant="scale" duration={1.0} className="h-full">
                  {demoContent}
                </ZoomEffect>
              )}
              
              {activeEffect === "combined" && (
                <ZoomEffect variant="combined" duration={1.8} className="h-full">
                  {demoContent}
                </ZoomEffect>
              )}
            </>
          )}
        </div>

        {/* Different Center Points Demo */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Demo với các vị trí trung tâm khác nhau
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Left */}
            <CircularReveal 
              centerX={20} 
              centerY={20} 
              duration={1.5} 
              delay={0.2}
              triggerOnView={true}
              className="h-48"
            >
              <div className="bg-red-500 h-full rounded-lg flex items-center justify-center text-white font-bold">
                Top Left (20%, 20%)
              </div>
            </CircularReveal>

            {/* Center */}
            <CircularReveal 
              centerX={50} 
              centerY={50} 
              duration={1.5} 
              delay={0.4}
              triggerOnView={true}
              className="h-48"
            >
              <div className="bg-green-500 h-full rounded-lg flex items-center justify-center text-white font-bold">
                Center (50%, 50%)
              </div>
            </CircularReveal>

            {/* Bottom Right */}
            <CircularReveal 
              centerX={80} 
              centerY={80} 
              duration={1.5} 
              delay={0.6}
              triggerOnView={true}
              className="h-48"
            >
              <div className="bg-blue-500 h-full rounded-lg flex items-center justify-center text-white font-bold">
                Bottom Right (80%, 80%)
              </div>
            </CircularReveal>
          </div>
        </div>
      </div>
    </div>
  );
}