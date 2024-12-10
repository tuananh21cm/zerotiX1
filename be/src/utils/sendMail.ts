import nodemailer from "nodemailer";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { ChartConfiguration } from "chart.js";
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
                    formatter: (value: any, context: any) => {
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

//table top sold 

// Send email with chart
export const sendEmail = async (data: any) => {
    try {

        // Extract all processedData from all sellers
        const allProducts = data.detail.flatMap((seller: any) => seller.processedData);

        // Aggregate products by title
        const aggregatedProducts: Record<string, { title: string; amount: number; image: string }> = {};
        allProducts.forEach((product: any) => {
            if (aggregatedProducts[product.title]) {
                aggregatedProducts[product.title].amount += product.amount;
            } else {
                aggregatedProducts[product.title] = { ...product };
            }
        });

        // Convert aggregated data to an array and sort by amount sold
        const topProducts = Object.values(aggregatedProducts)
            .sort((a, b) => b.amount - a.amount) // Sort in descending order of amount
            .slice(0, 10); // Select top 5 products

        // Generate the table for the top 5 products
        const topProductsTableRows = topProducts.map((product) => {
            const truncatedTitle = product.title.split(" ").slice(0, 10).join(" ");
            const titleWithEllipsis = product.title.split(" ").length > 10 ? `${truncatedTitle}...` : truncatedTitle;

            return `
                <tr>
                    <td style="border: 1px solid #dddddd; padding: 8px; text-align: center;">
                        <img src="${product.image}" alt="${product.title}" style="width: 50px; height: auto;">
                    </td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">${titleWithEllipsis}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px; text-align: center;">${product.amount}</td>
                </tr>
            `;
        }).join("");

        const topProductsTable = `
    <h2>Top 10 Hôm nay</h2>
    <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
        <thead>
            <tr>
                <th style="border: 1px solid #dddddd; padding: 8px;">Image</th>
                <th style="border: 1px solid #dddddd; padding: 8px;">Title</th>
                <th style="border: 1px solid #dddddd; padding: 8px;">Số Lượng</th>
            </tr>
        </thead>
        <tbody>
            ${topProductsTableRows}
        </tbody>
    </table>
`;
        const tableRows = data.reportMonth.namesReport.map((name: any, index: any) => {
            const sold = data.reportMonth.soldReport[index] || "0";
            const coefficient = data.reportMonth.coefficient[index] || "0";
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
        const formattedTime = now.toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit"
        });

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
                ${topProductsTable}
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
export const sendEmailYesterday = async (data: any) => {
    try {
        const allProducts = data.detail.flatMap((seller: any) => seller.processedData);
        const aggregatedProducts: Record<string, { title: string; amount: number; image: string }> = {};
        allProducts.forEach((product: any) => {
            if (aggregatedProducts[product.title]) {
                aggregatedProducts[product.title].amount += product.amount;
            } else {
                aggregatedProducts[product.title] = { ...product };
            }
        });
        const topProducts = Object.values(aggregatedProducts)
            .sort((a, b) => b.amount - a.amount) // Sort in descending order of amount
            .slice(0, 10); // Select top 5 products
        const topProductsTableRows = topProducts.map((product) => {
            const truncatedTitle = product.title.split(" ").slice(0, 10).join(" ");
            const titleWithEllipsis = product.title.split(" ").length > 10 ? `${truncatedTitle}...` : truncatedTitle;

            return `
                <tr>
                    <td style="border: 1px solid #dddddd; padding: 8px; text-align: center;">
                        <img src="${product.image}" alt="${product.title}" style="width: 50px; height: auto;">
                    </td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">${titleWithEllipsis}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px; text-align: center;">${product.amount}</td>
                </tr>
            `;
        }).join("");

        const topProductsTable = `
    <h2>Top 10 Hôm Qua</h2>
    <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
        <thead>
            <tr>
                <th style="border: 1px solid #dddddd; padding: 8px;">Image</th>
                <th style="border: 1px solid #dddddd; padding: 8px;">Title</th>
                <th style="border: 1px solid #dddddd; padding: 8px;">Số Lượng</th>
            </tr>
        </thead>
        <tbody>
            ${topProductsTableRows}
        </tbody>
    </table>
`;
        const tableRows = data.reportMonth.namesReport.map((name: any, index: any) => {
            const sold = data.reportMonth.soldReport[index] || "0";
            const coefficient = data.reportMonth.coefficient[index] || "0";
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
        const formattedTime = now.toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit"
        });

        // Define mail options with HTML content and embedded chart image
        const mailOptions = {
            from: "tuananh.kbt2024@gmail.com",
            to: ["tuananh.kbt2024@gmail.com"
                // ,"ebayinc2020.nv32@gmail.com","quanganhbn168@gmail.com","honghanh240801@gmail.com","tranductuanbn99@gmail.com","ebayinc2020.nv87@gmail.com","thaodo.2610.a@gmail.com","ebayinc2020.nv46@gmail.com"
            ],
            subject: "Báo Cáo Sold Ngày Hôm Qua X1 Team",
            html: `
            <p><strong style="color:red; font-size:28px">Tổng Sold: ${data.totalSold}</strong></p>
                <p><strong>Chi Tiết (click)</strong></p> 
                <img src="cid:chartImage" alt="Sales Chart"/>
                ${topProductsTable}
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
