export type Permission = {
    id: number;
    name: string;
};

export type Role = {
    id: number;
    name: string;
    permissions: Permission[];
};

export type User = {
    id: number;
    nome: string;
    email: string;
    roles: Role[];
    permissions: Permission[];
};

export function getUserPermissions(user?: User | null): string[] {
    const directPermissions = user?.permissions?.map((p) => p.name) ?? [];

    const rolePermissions =
        user?.roles?.flatMap((role) =>
            role.permissions?.map((permission) => permission.name) ?? []
        ) ?? [];

    return Array.from(new Set([...directPermissions, ...rolePermissions]));
}

export function hasPermission(user: any | null, permission: string): boolean {
    return getUserPermissions(user).includes(permission);
}