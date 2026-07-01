

export const generateLatexCode = async (formData) => {

    const { borderXShift , borderYShift , borderColor , hlength , thickness , verticalSpaceAfterBorder , verticalSpaceAfterHeading , verticalSpaceAfterSubheading , contentXShift , contentYShift , contentTopShift , contentBottomShift , heading , subHeading , } = formData;

    // 1. Configuration/Template Block
const documentHeader = `
\\documentclass{article}
\\usepackage[a4paper,left=${contentXShift}cm,right=${contentYShift}cm,top=${contentTopShift}cm,bottom=${contentBottomShift}cm]{geometry}
\\usepackage{tikz}
\\begin{document}
\\begin{tikzpicture}[remember picture,overlay]
\\fill[fill=${borderColor}] ([xshift=${borderXShift}cm,yshift=-${borderYShift}cm]current page.north west) rectangle ++(${hlength}cm,-${thickness}cm);
\\end{tikzpicture}
`;

// 2. Content Block (The "Heading" area)
const documentContent = `
\\hspace{${verticalSpaceAfterBorder}cm}
\\begin{center}
\\textbf{\\LARGE ${heading}}\\\\[${verticalSpaceAfterHeading}cm]
\\large ${subHeading}
\\end{center}
\\vspace{${verticalSpaceAfterSubheading}cm}
`;

// 3. Control Block (Breaks and Spacing)
const paraBreak = `\\par\\vspace{1cm}`;

// 4. Footer Block
const documentFooter = `\\end{document}`;


const paraArray = formData.para;
const count = paraArray[0];

console.log(count)

let docParts = [documentHeader, documentContent];


for (let i = 1; i <= count; i++) {
    const paraText = paraArray[i];
    
    // Add the text
    docParts.push(paraText);
    
    // Add the break if it's not the last paragraph
    if (i < count) {
        docParts.push(paraBreak);
    }
}


docParts.push(documentFooter);


const final = docParts.join("\n");



    return final;
};