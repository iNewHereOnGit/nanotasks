import helpDocs from "../utilities/helpFile.js";

const helpFunction = async () => {
    //iterate on all objects in commands object
    for (const command in helpDocs) {
        console.log(
            `${helpDocs[command].name} - ${helpDocs[command].description}`
        );
    }
};

export { helpFunction };
