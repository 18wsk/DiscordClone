import clsx from "clsx";

export const NavButton = ({
    id,
    handleSectionClick,
    activeSection
} : {
    id: string,
    handleSectionClick: (section: string) => void,
    activeSection: string
}) => {
return (
    <div className="w-full h-full flex items-center justify-center">
        <button 
            className={clsx(
                "flex items-center justify-center text-center w-24 p-1 rounded-lg text-white hover:text-white hover:bg-accent-hover/10", 
            )}
            onClick={() => {
                handleSectionClick(id);
            }}
        >
            {id}
        </button>
    </div>
)
}