import { useLayoutEffect } from "react";

export function useScrollToBottomOnChange(
    ref: React.RefObject<HTMLElement | null>,
    dependency: unknown
) {
    useLayoutEffect(() => {
        const container = ref.current;
        if (!container) return;

        container.scrollTop = container.scrollHeight;
    }, [dependency, ref]);
}