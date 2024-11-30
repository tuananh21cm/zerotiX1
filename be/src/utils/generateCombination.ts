const defaultInputString =
    "azure [devops] [training|schulung]," +
    "[azure] devops fundamental [training|schulung]," +
    "[azure] devops coaching," +
    "[azure] devops [consulting|beratung|umsetzung]," +
    "infrastructure as code [bicep|arm-template|terraform] [training|schulung]," +
    "microsoft devops [training|schulung]";
    /**
 * 
 * @param arrays 
 * @returns 
 */
export function cartesianProduct<T>(arrays: Array<Array<T>>) {
    return arrays.reduce(
        (acc, curr) => acc.flatMap((a) => curr.map((c: any) => a.concat(c))),
        [[]]
    );
}

export function generateOptions(match: string[]) {
    const options = match[1].split("|");
    options.push(""); // Add an empty option to represent the absence of optional data
    return options;
}


/**
 *
 * @param inputString
 * @returns
 */
export function generateCombinations(inputString: string) {
    const pattern = /\[([^\]]+)\]/g;

    const matches = [...inputString.matchAll(pattern)];
    const optionSets = matches.map(generateOptions);
    const combinations = cartesianProduct(optionSets);

    const results = combinations.map((combination: any[]) => {
        let result = inputString;
        combination.forEach((option: any, index: number) => {
            result = result.replace(matches[index][0], option);
        });
        return result.trim();
    });

    return results;
}
console.log(generateCombinations(defaultInputString))
