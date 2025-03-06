import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export default function EditParams() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="lg" variant="outline">Select Model</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-3">
        <div className="space-y-4">
          <div className="flex items-center">
            <h4 className="font-medium text-sm">Select Model</h4>
          </div>
          <RadioGroup defaultValue="svm" className="gap-3">
            <div className="flex items-center justify-between rounded-md border border-transparent p-2 hover:bg-muted transition-colors">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="svm" id="svm" />
                <Label htmlFor="svm" className="text-sm cursor-pointer">SVM</Label>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">Support Vector Machine (SVM) is a supervised learning algorithm that separates data points using hyperplanes, effective for both classification and regression tasks.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center justify-between rounded-md border border-transparent p-2 hover:bg-muted transition-colors">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="random_forest" id="random_forest" />
                <Label htmlFor="random_forest" className="text-sm cursor-pointer">Random Forest</Label>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">Random Forest is an ensemble learning method that constructs multiple decision trees and outputs the class that is the mode of the classes of individual trees.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center justify-between rounded-md border border-transparent p-2 hover:bg-muted transition-colors">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="saint" id="saint" />
                <Label htmlFor="saint" className="text-sm cursor-pointer">SAINT</Label>
              </div>
              <TooltipProvider>
                <Tooltip >
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">Self-Attention and Intersample Attention Transformer (SAINT) is a neural network architecture that uses transformers to process tabular data with both numerical and categorical features.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  )
}
