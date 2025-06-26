"use client";

import { buttonVariants } from "./button-shadcn";
import { Label } from "./label";
import { Switch } from "./switch";
import { useMediaQuery } from "../../hooks/use-media-query";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href?: string;
  onClick?: () => void;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
  onGetStarted?: () => void;
  onContactSales?: () => void;
}

export function PricingEnhanced({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
  onGetStarted,
  onContactSales,
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "#8B5CF6", // purple-500
          "#EC4899", // pink-500
          "#3B82F6", // blue-500
          "#10B981", // green-500
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  const handlePlanClick = (plan: PricingPlan) => {
    if (plan.onClick) {
      plan.onClick();
    } else if (plan.buttonText === "Contact Sales") {
      onContactSales?.();
    } else {
      onGetStarted?.();
    }
  };

  return (
    <div className="py-20 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
            {title}
          </h2>
          <p className="text-white/90 text-lg whitespace-pre-line max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="flex justify-center items-center mb-10 gap-4">
          <span className="text-white font-medium">Monthly</span>
          <Label className="relative inline-flex items-center cursor-pointer">
            <Switch
              ref={switchRef as any}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative"
            />
          </Label>
          <span className="text-white font-medium">
            Annual <span className="text-purple-400">(Save 20%)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -20 : 0,
                      opacity: 1,
                      x: index === 2 ? -15 : index === 0 ? 15 : 0,
                      scale: index === 0 || index === 2 ? 0.96 : 1.0,
                    }
                  : { y: 0, opacity: 1 }
              }
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: index * 0.1,
              }}
              className={cn(
                "rounded-2xl border p-6 bg-gray-900/90 backdrop-blur-sm text-center flex flex-col relative",
                plan.isPopular 
                  ? "border-purple-500 border-2 shadow-lg shadow-purple-500/20" 
                  : "border-gray-600/50",
                !plan.isPopular && "mt-5"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="flex-1 flex flex-col">
                <p className="text-lg font-semibold text-white mb-2">
                  {plan.name}
                </p>
                
                <div className="mt-6 flex items-center justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    <NumberFlow
                      value={
                        isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                      }
                      format={{
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }}
                      formatter={(value) => plan.price === "0" ? "Free" : `$${value}`}
                      transformTiming={{
                        duration: 500,
                        easing: "ease-out",
                      }}
                      willChange
                      className="font-variant-numeric: tabular-nums"
                    />
                  </span>
                  {plan.period !== "Next 3 months" && plan.price !== "0" && (
                    <span className="text-sm font-semibold leading-6 tracking-wide text-white/70">
                      / {plan.period}
                    </span>
                  )}
                </div>

                {plan.price !== "0" && (
                  <p className="text-xs leading-5 text-white/60 mt-2">
                    {isMonthly ? "billed monthly" : "billed annually"}
                  </p>
                )}

                <p className="text-white/80 mt-4 mb-6">
                  {plan.description}
                </p>

                <ul className="mt-5 gap-3 flex flex-col text-left">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      {feature.startsWith('✗') ? (
                        <>
                          <span className="h-4 w-4 text-red-500 mt-1 flex-shrink-0">✗</span>
                          <span className="text-red-300 text-sm">{feature.replace('✗ ', '')}</span>
                        </>
                      ) : feature.startsWith('✓') ? (
                        <>
                          <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-white/90 text-sm">{feature.replace('✓ ', '')}</span>
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-white/90 text-sm">{feature}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <button
                    onClick={() => handlePlanClick(plan)}
                    className={cn(
                      buttonVariants({
                        variant: plan.isPopular ? "default" : "outline",
                      }),
                      "w-full gap-2 text-lg font-semibold tracking-tighter transition-all duration-300",
                      plan.isPopular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                        : "border-purple-500/60 text-white hover:bg-purple-600/30 hover:text-white bg-transparent"
                    )}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}