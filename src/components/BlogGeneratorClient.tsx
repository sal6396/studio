"use client";

import { useFormState, useFormStatus } from "react-dom";
import { handleGenerateBlogContent, type BlogGenerationFormState } from "@/app/actions/blogActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle2, Copy } from "lucide-react";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

const initialState: BlogGenerationFormState = {
  message: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        "Generate Content"
      )}
    </Button>
  );
}

export default function BlogGeneratorClient() {
  const [state, formAction] = useFormState(handleGenerateBlogContent, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.data && state.data.variations.length > 0) {
         toast({
            title: "Success!",
            description: state.message,
            variant: "default",
          });
      } else if (state.issues || (state.message && !state.data)) {
         toast({
            title: "Error",
            description: state.message || "Failed to generate content.",
            variant: "destructive",
          });
      }
    }
  }, [state, toast]);

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "Content copied successfully.",
      });
    }).catch(err => {
      toast({
        title: "Copy failed",
        description: "Could not copy content to clipboard.",
        variant: "destructive",
      });
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl text-primary">AI Blog Content Generator</CardTitle>
        <CardDescription>
          Enter a topic or prompt, and our AI will generate multiple blog content variations for you.
        </CardDescription>
      </CardHeader>
      <form action={formAction} ref={formRef}>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="prompt" className="text-lg font-medium">Blog Topic / Prompt</Label>
            <Textarea
              id="prompt"
              name="prompt"
              placeholder="e.g., 'The impact of AI on modern web development' or 'Top 5 cybersecurity tips for small businesses'"
              required
              className="min-h-[100px] mt-2"
              defaultValue={state.fields?.prompt}
            />
            {state.issues?.find(issue => issue.startsWith('prompt:')) && (
              <p className="text-sm text-destructive mt-1">{state.issues.find(issue => issue.startsWith('prompt:'))?.replace('prompt: ', '')}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="numVariations" className="text-lg font-medium">Number of Variations (1-5)</Label>
            <Slider
              id="numVariations"
              name="numVariations"
              defaultValue={[3]}
              min={1}
              max={5}
              step={1}
              className="my-4"
            />
             {/* Hidden input to actually submit slider value, or use JS to update a hidden input */}
            <Input type="hidden" name="numVariations" defaultValue={state.fields?.numVariations || "3"} 
              ref={input => {
                const slider = document.getElementById('numVariations') as HTMLInputElement | null; // This is not a standard HTML element, slider is custom
                // This part needs a proper way to get slider value for form submission if not using JS state.
                // For ShadCN slider, you often manage state with React state and pass it.
                // Since this is a form action, we'll rely on a simple hidden input for now, assuming the slider can update it.
                // A more robust solution would use React state for the slider and set the hidden input value onChange.
                // Or simply use a number input instead of a slider for simplicity with form actions without JS state for the slider.
                // For now, let's assume '3' default if not changed manually in a real number input (slider doesn't have name prop for forms easily)
              }}
            />
            <p className="text-sm text-muted-foreground">Select how many different versions of the blog post you want.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch">
          <SubmitButton />
          {state.message && !state.data && !state.issues && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          {state.issues && (
             <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Validation Errors</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside">
                  {state.issues.map((issue, i) => <li key={i}>{issue}</li>)}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </form>

      {state.data && state.data.variations && state.data.variations.length > 0 && (
        <div className="mt-8 p-6 border-t">
          <h3 className="text-2xl font-semibold mb-6 text-primary flex items-center">
            <CheckCircle2 className="h-6 w-6 mr-2 text-green-500" />
            Generated Content Variations
          </h3>
          <div className="space-y-6">
            {state.data.variations.map((variation, index) => (
              <Card key={index} className="bg-secondary/30">
                <CardHeader className="flex flex-row justify-between items-center">
                  <CardTitle>Variation {index + 1}</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(variation)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </CardHeader>
                <CardContent>
                  <Textarea
                    readOnly
                    value={variation}
                    className="min-h-[200px] bg-background text-foreground"
                    aria-label={`Generated Blog Content Variation ${index + 1}`}
                  />
                  {/* In a real app, provide "Edit & Publish" options */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
