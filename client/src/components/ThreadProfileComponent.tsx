import React from 'react'

const ThreadProfileComponent = () => {
    const discLogo = require("./../assets/discord_logo.png");
    return (
        <div className="absolute bottom-0 left-[72px] bg-tertiary-2 opacity-70 w-[240px] h-[52px]">
	    	<div className="h-full w-full grid grid-cols-2 bg-tertiary-2">
	    		<div className="h-full w-full grid grid-cols-3 pt-[10px] px-[8px] bg-tertiary-2">
	    			<div className="relative rounded-full bg-tertiary-2 h-[32px] w-[32px] z-1">
	    				<img src={discLogo} className="rounded-full h-[32px] w-[32px] z-1" alt={"pfp"}/>  {/* PFP  */}
	    				<div className="rounded-full bg-tertiary-2 h-[15px] w-[15px] absolute bottom-0 right-0 z-2 translate-x-[1.75px] translate-y-[1.75PX] border-2 border-tertiary-2">
	    					<div className="rounded-full bg-green-500 h-[14px] w-[14px] absolute bottom-0 right-0 z-3 translate-x-[1.75px] translate-y-[1.75PX] border-2 border-tertiary-2"></div>
	    				</div>
	    			</div>
	    			<div className="col-span-2 pl-[4px] pb-[4pxh-[32px] z-10">
	    				<div className="w-full">
	    					<p className="text-[#FFFFFF] text-profileName leading-tight font-semibold">NotChillis</p> {/* USERNAME  */}
	    					<p className="text-[#f2f3f5] text-profileId"> #4973</p> {/* code tag */} 
	    				</div>
	    			</div>
	    		</div>
	    		<div className="w-full h-full grid grid-cols-3">
	    		</div>
	    	</div>
	    </div>
    )
}

export default ThreadProfileComponent