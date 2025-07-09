'use client';

export default function DeliberateErrorComponent() {
    throw new Error("Deliberate error thrown from Next.js component");
    return null
}