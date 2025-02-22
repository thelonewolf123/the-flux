import {
    Download,
    Heart,
    ImageIcon,
    Plus,
    Share2,
    Sparkles,
    Trash2
} from 'lucide-react'
import Image from 'next/image'

const recentGenerations = [
    {
        id: 1,
        prompt: 'A beautiful woman in a red dress walking through a garden',
        image: 'https://img.freepik.com/free-photo/sensual-brunette-model-fashion-red-suit-garden_149155-4573.jpg',
        timestamp: '2 hours ago'
    },
    {
        id: 2,
        prompt: 'Model looking through window with dramatic lighting',
        image: 'https://img.freepik.com/free-photo/model-looking-into-windo_1301-2992.jpg',
        timestamp: '4 hours ago'
    }
    // Add more recent generations as needed
]

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[#030303]">
            {/* Background gradients */}
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-rose-500/10 blur-3xl" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
                {/* Header Section */}

                <main className="max-w-7xl mx-auto px-6 py-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        {[
                            {
                                icon: ImageIcon,
                                label: 'Total Generations',
                                value: '124',
                                change: '+12% this week'
                            },
                            {
                                icon: Sparkles,
                                label: 'Available Credits',
                                value: '876',
                                change: '230 used this month'
                            },
                            {
                                icon: Heart,
                                label: 'Liked Creations',
                                value: '45',
                                change: '3 new likes'
                            },
                            {
                                icon: Share2,
                                label: 'Shared Works',
                                value: '28',
                                change: 'Last shared 2h ago'
                            }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 backdrop-blur-sm transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-white/[0.03] group-hover:bg-white/[0.08] transition-colors">
                                        <stat.icon className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm">
                                            {stat.label}
                                        </p>
                                        <p className="text-2xl font-bold text-white mt-1">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-white/40 mt-1">
                                            {stat.change}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Gallery Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">
                            Recent Creations
                        </h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white/80 text-sm transition-colors">
                                All
                            </button>
                            <button className="px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white/80 text-sm transition-colors">
                                Liked
                            </button>
                            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white text-sm hover:opacity-90 transition-opacity">
                                New Creation
                            </button>
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {recentGenerations.map((gen) => (
                            <div
                                key={gen.id}
                                className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08] hover:border-white/20 backdrop-blur-sm transition-all"
                            >
                                <div className="relative aspect-square">
                                    <Image
                                        src={gen.image}
                                        alt={gen.prompt}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="absolute bottom-0 p-4 w-full">
                                            <p className="text-sm text-white/90 line-clamp-2 mb-3">
                                                {gen.prompt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-2">
                                                    <button className="p-2 rounded-lg bg-white/30 hover:bg-white/50 transition-colors">
                                                        <Heart className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 rounded-lg bg-white/30 hover:bg-white/50 transition-colors">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 rounded-lg bg-white/30 hover:bg-white/50 transition-colors">
                                                        <Share2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <button className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors">
                                                    <Trash2 className="w-4 h-4 text-red-400" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* New Creation Card */}
                        <button className="aspect-square rounded-2xl border-2 border-dashed border-white/[0.08] hover:border-white/20 flex flex-col items-center justify-center gap-2 transition-colors group">
                            <div className="p-4 rounded-xl bg-white/[0.03] group-hover:bg-white/[0.08] transition-colors">
                                <Plus className="w-6 h-6 text-white/40 group-hover:text-white/80 transition-colors" />
                            </div>
                            <span className="text-sm text-white/40 group-hover:text-white/80 transition-colors">
                                New Creation
                            </span>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    )
}
