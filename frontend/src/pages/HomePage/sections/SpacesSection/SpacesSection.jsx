import { useSpaces } from "../../../../providers/SpacesProvider"
import SpacesCard from "./components/SpacesCard/SpacesCard"
import CreateSpaceCard from "./components/CreateSpaceCard/CreateSpaceCard"
import { useState } from "react"

const SpacesSection = () => {
    const { spaces, createSpace } = useSpaces()
    const [open, setOpen] = useState(false)
    const handleCreateSpace = (space) => {
        createSpace(space)
        setOpen(false)
    }
    return (
        <section className="p-10 flex flex-col gap-5 overflow-hidden w-full flex-1">
            <h2 className="text-2xl font-bold">Administración de espacios</h2>
            <div className="flex flex-wrap justify-center gap-5 overflow-x-auto p-10 bg-white rounded-md border border-gray-200 shadow-xs">
                {spaces.map((space) => (
                    <SpacesCard
                        key={space.id}
                        name={space.nombre}
                        location={space.ubicacion}
                        capacity={space.capacidad}
                        price={space.precio_por_hora}
                        id={space.id}
                    />
                ))}
                <CreateSpaceCard open={open} setOpen={setOpen} handleCreateSpace={handleCreateSpace} />
            </div>
        </section>
    )
}

export default SpacesSection
