import BottomNavigation from '@/components/layout/BottomNav'
import HamburgerMenu from '@/components/layout/HamburgerMenu'

export default function MainLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
            <HamburgerMenu />
            {/* Enhanced background decoration */}
            <div className="absolute inset-0 bg-gradient-dark"></div>
            
            {/* Floating orbs for visual interest */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float" style={{animationDelay: '2s'}}></div>
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                }}></div>
            </div>
            
            <main className="relative z-10 pb-32 animate-fade-in"> {/* Increased space for bottom nav */}
                {children}
            </main>
            <BottomNavigation />
        </div>
    )
}