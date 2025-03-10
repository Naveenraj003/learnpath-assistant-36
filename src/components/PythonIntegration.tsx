
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Terminal, PlusCircle, Code } from 'lucide-react';

// This component simulates Python integration
// In a real implementation, you would connect to a Python backend
const PythonIntegration: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  // Simulate Python code execution
  const runPythonCode = async (code: string) => {
    setIsProcessing(true);
    
    // Simulate delay of processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sample outputs for different inputs
    if (code.includes('print')) {
      const match = code.match(/print\(['"](.+)['"]\)/);
      if (match) {
        setOutput(match[1]);
      } else {
        setOutput('# Output would appear here');
      }
    } else if (code.includes('import pandas')) {
      setOutput('# Data analysis with pandas\n\nPandas imported successfully.\nSample data frame would be created here.');
    } else if (code.includes('matplotlib') || code.includes('plt')) {
      setOutput('# Visualization\n\nMatplotlib would render a chart here based on your data.');
    } else if (code.includes('sklearn') || code.includes('scikit-learn')) {
      setOutput('# Machine Learning\n\nScikit-learn model training would happen here.\nResults would be displayed after processing.');
    } else {
      setOutput('# Python code executed\n\nNo output to display or unsupported operation.');
    }
    
    setIsProcessing(false);
  };
  
  const handleRun = () => {
    if (input.trim()) {
      runPythonCode(input);
    }
  };
  
  const sampleCodes = [
    "print('Hello from Python!')",
    "import pandas as pd\ndf = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})\nprint(df)",
    "import matplotlib.pyplot as plt\nimport numpy as np\nx = np.linspace(0, 10, 100)\nplt.plot(x, np.sin(x))\nplt.show()"
  ];
  
  return (
    <div className="glass-panel rounded-xl p-4 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Python Data Analysis</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium">Python Code</p>
            <div className="flex gap-1">
              {sampleCodes.map((code, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  size="sm"
                  onClick={() => setInput(code)}
                  className="text-xs"
                >
                  Example {index + 1}
                </Button>
              ))}
            </div>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Python code here..."
            className="font-mono h-[150px] glass-input text-sm"
          />
          <Button 
            onClick={handleRun}
            disabled={isProcessing || !input.trim()}
            className="mt-2 w-full"
          >
            {isProcessing ? 'Running...' : 'Run Code'}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2">Output</p>
          <div className="python-output h-[150px] overflow-auto">
            {output || '# Output will appear here'}
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Educational Analysis</p>
            <div className="bg-secondary/50 p-3 rounded-md text-sm">
              <p>Python is widely used in data analysis for educational research. Use it to analyze course outcomes, predict student performance, and visualize educational trends.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonIntegration;
