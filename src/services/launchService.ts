import { Launch } from "../domains/launch";

export const getLaunches = async () => {

    try{
        const response = await fetch("https://api.spacexdata.com/v4/launches");
        if(!response.ok){
            throw new Error(`HTTP Error! status: ${response.status}`);
        }
        
        const data: Record<string, any>[] = await response.json();
        const launches = data.map((item)=>{
            if (!item["details"]){
                item["details"] = "Description ...";
            }
            const launch: Launch = {
                flightNumber: item["flight_number"],
                launchName: item["name"],
                description: item["details"],
                urlImage: item["links"]["patch"]["small"],
                webcastUrl: item["links"]["webcast"]
            };

            return launch;
        });

        return launches;

    }catch(error){
        console.error("Error get launch service", error);
        throw error;
    }

};
