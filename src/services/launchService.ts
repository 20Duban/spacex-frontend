import { Launch } from "../domains/launch";


export const getLaunches = async () => {

    console.log(process.env);

    try{
        
        const response = await fetch("https://e2roo2o5u5.execute-api.us-east-1.amazonaws.com/Prod/launches");
        if(!response.ok){
            throw new Error(`HTTP Error! status: ${response.status}`);
        }
        
        const result: Record<string, any> = await response.json();
        const data: Record<string, any>[] = result["summary"]["data"];

        const launches = data.map((item)=>{
            if (!item["description"]){
                item["description"] = "Description ...";
            }
            const launch: Launch = {
                id: item["id"],
                flightNumber: item["flightNumber"],
                launchName: item["launchName"],
                description: item["description"],
                urlImage: item["urlImage"],
                webcastUrl: item["webcastUrl"]
            };

            return launch;
        });

        return launches;

    }catch(error){
        console.error("Error get launch service", error);
        throw error;
    }

};
