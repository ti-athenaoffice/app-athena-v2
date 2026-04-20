type NotificationPermissionStatus = NotificationPermission | "unsupported";

export interface BrowserNotificationOptions {
    title: string;
    body?: string;
    icon?: string;
    badge?: string;
    image?: string;
    tag?: string;
    lang?: string;
    dir?: NotificationDirection;
    requireInteraction?: boolean;
    renotify?: boolean;
    silent?: boolean;
    timestamp?: number;
    data?: unknown;
    preventWhenVisible?: boolean;
    onClick?: (event: Event, notification: Notification) => void;
    onClose?: (event: Event, notification: Notification) => void;
    onError?: (event: Event, notification: Notification) => void;
    onShow?: (event: Event, notification: Notification) => void;
}

export interface BrowserNotificationResult {
    ok: boolean;
    reason?:
        | "unsupported"
        | "denied"
        | "default"
        | "hidden_blocked"
        | "creation_failed";
    notification?: Notification;
    permission: NotificationPermissionStatus;
}

function isBrowser(): boolean {
    return typeof window !== "undefined";
}

function isNotificationSupported(): boolean {
    return isBrowser() && "Notification" in window;
}

function isDocumentVisible(): boolean {
    if (!isBrowser() || typeof document === "undefined") return true;
    return document.visibilityState === "visible";
}

export function getNotificationPermission(): NotificationPermissionStatus {
    if (!isNotificationSupported()) return "unsupported";
    return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermissionStatus> {
    if (!isNotificationSupported()) return "unsupported";

    if (Notification.permission === "granted") return "granted";
    if (Notification.permission === "denied") return "denied";

    try {
        const permission = await Notification.requestPermission();
        return permission;
    } catch {
        return Notification.permission ?? "default";
    }
}

export function canNotify(): boolean {
    return getNotificationPermission() === "granted";
}

export async function ensureNotificationPermission(): Promise<boolean> {
    const permission = await requestNotificationPermission();
    return permission === "granted";
}

export function closeNotification(notification?: Notification | null): void {
    try {
        notification?.close();
    } catch {
        // noop
    }
}

export function notifyBrowser(
    options: BrowserNotificationOptions
): BrowserNotificationResult {
    const permission = getNotificationPermission();

    if (permission === "unsupported") {
        return { ok: false, reason: "unsupported", permission };
    }

    if (permission !== "granted") {
        return {
            ok: false,
            reason: permission === "denied" ? "denied" : "default",
            permission,
        };
    }

    const {
        title,
        body,
        icon,
        badge,
        tag,
        lang,
        dir,
        requireInteraction,
        silent,
        data,
        preventWhenVisible = true,
        onClick,
        onClose,
        onError,
        onShow,
    } = options;

    if (preventWhenVisible && isDocumentVisible()) {
        return {
            ok: false,
            reason: "hidden_blocked",
            permission,
        };
    }

    try {
        const notification = new Notification(title, {
            body,
            icon,
            badge,
            tag,
            lang,
            dir,
            requireInteraction,
            silent,
            data,
        });

        if (onClick) {
            notification.onclick = (event) => onClick(event, notification);
        }

        if (onClose) {
            notification.onclose = (event) => onClose(event, notification);
        }

        if (onError) {
            notification.onerror = (event) => onError(event, notification);
        }

        if (onShow) {
            notification.onshow = (event) => onShow(event, notification);
        }

        return {
            ok: true,
            notification,
            permission,
        };
    } catch {
        return {
            ok: false,
            reason: "creation_failed",
            permission,
        };
    }
}

export async function requestAndNotifyBrowser(
    options: BrowserNotificationOptions
): Promise<BrowserNotificationResult> {
    const permission = await requestNotificationPermission();

    if (permission !== "granted") {
        return {
            ok: false,
            reason: permission === "unsupported"
                ? "unsupported"
                : permission === "denied"
                    ? "denied"
                    : "default",
            permission,
        };
    }

    return notifyBrowser(options);
}