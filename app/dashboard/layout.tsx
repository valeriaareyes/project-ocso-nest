export default function LayoutDashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="w-screen h-screen bg-orange-50">{children}</div>;
}