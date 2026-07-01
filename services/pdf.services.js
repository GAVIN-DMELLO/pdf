

export const generateLatexCode = async (formData) => {
    const { 
        borderYShift, borderColor, hlength, thickness, 
        verticalSpaceAfterBorder, verticalSpaceAfterHeading, 
        verticalSpaceAfterSubheading, contentXShift, contentYShift, 
        contentTopShift, contentBottomShift, heading, subHeading , headingSize , subHeadingSize , paraSize 
    } = formData;

    // latex class and packages 
    const latexPreamble = `
    \\documentclass{article}
    \\usepackage[a4paper,left=${contentXShift}cm,right=${contentYShift}cm,top=${contentTopShift}cm,bottom=${contentBottomShift}cm]{geometry}
    \\usepackage{tikz}
    \\usepackage{xcolor}
    \\usepackage{eso-pic}
    \\usepackage{mathptmx}

    \\AddToShipoutPictureBG{
    \\begin{tikzpicture}[remember picture,overlay]
        % Top Border (Centered using current page.north anchor)
        \\fill[fill=${borderColor}] ([xshift=-${hlength/2}cm, yshift=-${borderYShift}cm]current page.north) rectangle ++(${hlength}cm, -${thickness}cm);
        
        % Bottom Border (Centered using current page.south anchor)
        \\fill[fill=${borderColor}] ([xshift=-${hlength/2}cm, yshift=${borderYShift}cm]current page.south) rectangle ++(${hlength}cm, ${thickness}cm);
    \\end{tikzpicture}
    }
    `;

    // 2. Document begin
    const documentBegin = `\\begin{document}`;


    


    // 4. Heading and Subheading
    const documentContent = 
    `
    \\hspace{${verticalSpaceAfterBorder}cm}
    \\begin{center}
    {\\${headingSize} \\textbf{${heading}}}\\\\[${verticalSpaceAfterHeading}cm]
    {\\${subHeadingSize} \\textit{${subHeading}}}
    \\end{center}
    \\vspace{${verticalSpaceAfterSubheading}cm}
    `;


    // 5. Processing Paragraphs
    const paraBreak = `\\par\\vspace{1cm}`;
    const paraArray = formData.para;
    const count = paraArray[0];
    const paragraphs = [];

    for (let i = 1; i <= count; i++) {
        if (paraArray[i]) {
            paragraphs.push(paraArray[i]);
            // Add break only between paragraphs
            if (i < count) {
                paragraphs.push(paraBreak);
            }
        }
    }

    // 6. Document End
    const documentFooter = `\\end{document}`;

    // Assemble final document
    const final = [
        latexPreamble,
        documentBegin,
        documentContent,
        ...paragraphs,
        documentFooter
    ].join("\n");

    return final;
};