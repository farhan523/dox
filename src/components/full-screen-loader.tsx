import {LoaderIcon} from "lucide-react";

interface FullLoaderScreenProps {
    label ?: string,
    className ?: string
}

export default function FullLoaderScreen({label, className}: FullLoaderScreenProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-2">
            <LoaderIcon className="size-6 text-muted-foreground animate-spin"/>
            {label && <p className="text-muted-foreground text-sm">{label}</p>}
        </div>
    )
}