import { Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "./Card"; //seu componente base

export const KpiCard =({ icon: Icon, label, value, color = "text-light"}) => {
    const [displayValue, setDisplayValue] = useState(value);
    const [highlight, setHighlight] = useState ("");

    useEffect (() => {
        if (value > displayValue) {
            setHighlight("text-green-500 animate-pulse");
        } else if  (value < displayValue) {
            setHighlight("text-red-500 animate-pulse");
        }

        const timeout =setTimeout(() => {
            setHighlight("");
            setDisplayValue(value);
        }, 1000);
        
        return () => clearTimeout(timeout);
    }, [value, displayValue]);
    return (
        <Card className="text-center cursor-pointer hover:scale-105 transition-transform duration-300">
            <Icon className={`w-8 h-8 mx-auto mb-2 ${color}`}/>
                <h3 className={`text-2xl font-bold ${highlight || "text-dark"}`}>
                {displayValue}
            </h3>
            <p className="text-dark/70">{label}</p>
        </Card>
    )
}