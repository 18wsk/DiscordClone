import NavBar from '../components/ReUsable/NavBar'

const HomePage = () => {
    return (
        <div className="w-screen h-screen overflow-auto scrollbar-hide">
            <NavBar/>
            <div className="w-full h-full overflow-auto scrollbar-hide bg-primary">
            </div>
        </div>
    )
}

export default HomePage