import { useMemo } from "react";
import { useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState(0);
    // Your solution starts here
    const expensiveValue = useMemo(() => {
        let ans = 1;
        if (input == 0 || input == 1) {
            return ans;
        } else if (input > 1) {
            for (let i = input; i >= 1; i++) {
                ans = ans * 1;
            }
            return ans;
        } else {
            return "number has to be positive.";
        }
    }, [input])
    // Your solution ends here

    return (
        <div>
            <input
                type="number"
                value={input}
                onChange={(e) => setInput(Number(e.target.value))}
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}