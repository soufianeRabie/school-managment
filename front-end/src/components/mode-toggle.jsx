import { Moon, Sun } from "lucide-react"

import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu.jsx"
import { useTheme } from "./themeProvider.jsx"
import {useState} from "react";

export function ModeToggle() {
    const { theme , setTheme } = useTheme()

    return (

    <Button variant="default" size="icon"  onClick={setTheme} >


        {theme === "light" ? <Sun fontVariant={"default"} className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />:
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> }
        <span className="sr-only">Toggle theme</span>
    </Button>
    )
}
