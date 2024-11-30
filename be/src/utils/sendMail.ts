import nodemailer from "nodemailer";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { ChartConfiguration} from "chart.js";
import "chartjs-plugin-datalabels"; // Import Chart.js data labels plugin
import fs from "fs";
import path from "path";
// Chart.register(ChartDataLabels);
// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "tuananh22cm@gmail.com",
        pass: "usco rqnh zggj pbpk",
    },
});

// Function to generate colors
const generateColors = (numColors: number) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const hue = (i * (360 / numColors)) % 360;
        colors.push(`hsl(${hue}, 70%, 60%)`); 
    }
    return colors;
};

// Chart configuration
const generateChart = async (data: any) => {
    const width = 400; // Chart width
    const height = 400; // Chart height
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

    // Data for chart
    const labels = data.detail.map((item: any) => `${item.name}: ${item.amountSold}`);
    const values = data.detail.map((item: any) => item.amountSold);

    // Generate colors
    const colors = generateColors(values.length);

    const configuration: ChartConfiguration<"pie"> = {
        type: "pie",
        data: {
            labels,
            datasets: [
                {
                    label: "Total Sold",
                    data: values,
                    backgroundColor: colors,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    color: "#ffffff",
                    font: { weight: "bold" },
                    formatter: (value:any, context:any) => {
                        const dataset = context.chart.data.datasets[0].data as number[];
                        const total = dataset.reduce((sum, val) => sum + val, 0);
                        const percentage = ((value / total) * 100).toFixed(1); // One decimal place
                        return `${percentage}%`;
                    },
                },
            },
            animation: false,
        } as any,
    };
    
    

    // Render the chart as a buffer
    const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration as any);

    // Save image with a unique filename
    const filename = path.join(__dirname, `chart-${Date.now()}.png`);
    fs.writeFileSync(filename, imageBuffer);

    return filename;
};

// Send email with chart
export const sendEmail = async (data: any) => {
    try {
        const tableRows = data.reportMonth.namesReport.map((name:any, index:any) => {
            const sold = data.reportMonth.soldReport[index] || "0"; 
            const  coefficient = data.reportMonth.coefficient[index] || "0"; 
            return `<tr><td>${name}</td><td>${sold}</td><td>${coefficient}</td></tr>`;
        }).join("");
        
        const htmlTable = `
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #dddddd; padding: 8px;">Seller</th>
                        <th style="border: 1px solid #dddddd; padding: 8px;">Tổng Đơn</th>
                        <th style="border: 1px solid #dddddd; padding: 8px;">Hệ Số</th>
                    </tr>
                </thead>
               <tbody>
            ${tableRows.length > 0 
                ? tableRows
                : '<tr><td colspan="2" style="text-align: center;">No data available</td></tr>'
            }
        </tbody>
            </table>
        `;
        // Generate chart image and get the filename
        const chartFilename = await generateChart(data);
        const now = new Date();

        // Format the time
        const formattedTime = `${now.getHours()}:${now.getMinutes()} - ${now.getDate()}/${now.getMonth() + 1}`;
        
        // Define mail options with HTML content and embedded chart image
        const mailOptions = {
            from: "tuananh.kbt2024@gmail.com",
            to: ["tuananh.kbt2024@gmail.com"
                ,"ebayinc2020.nv32@gmail.com","quanganhbn168@gmail.com","honghanh240801@gmail.com","tranductuanbn99@gmail.com","ebayinc2020.nv87@gmail.com","thaodo.2610.a@gmail.com","ebayinc2020.nv46@gmail.com"
            ],
            subject: "Báo Cáo Sold X1 Team",
            html: `
            <p><strong style="color:red; font-size:28px">Tổng Sold: ${data.totalSold}</strong></p>
                <h1>Báo Cáo Cập Nhật Lúc ${formattedTime}</h1>
                <p><strong>Chi Tiết (click)</strong></p> 
                <img src="cid:chartImage" alt="Sales Chart"/>
                <h1>Báo Cáo Tháng </h1>
                 ${htmlTable}
            `,
            attachments: [
                {
                    filename: "chart.png",
                    path: chartFilename,
                    cid: "chartImage", // Embed the unique chart image
                },
            ],
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");

        // Clean up by deleting the image after sending
        fs.unlinkSync(chartFilename);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
