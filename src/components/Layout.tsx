import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Dumbbell, Users, ScanLine } from 'lucide-react';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-slate-900">
            {/* Header */}
            <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary-600 p-2 rounded-lg">
                                <Dumbbell className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-50">Gym Management</h1>
                                <p className="text-xs text-slate-400">Reception Dashboard</p>
                            </div>
                        </div>

                        <nav className="flex space-x-1">
                            <NavLink
                                to="/checkin"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${isActive
                                        ? 'bg-primary-600 text-white'
                                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                    }`
                                }
                            >
                                <ScanLine className="h-5 w-5" />
                                <span>Check-In</span>
                            </NavLink>

                            <NavLink
                                to="/members"
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${isActive
                                        ? 'bg-primary-600 text-white'
                                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                    }`
                                }
                            >
                                <Users className="h-5 w-5" />
                                <span>Members</span>
                            </NavLink>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
