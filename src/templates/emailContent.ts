
export interface AssignmentTemplateData {
    recipientName: string; 
    wishList: string;      
}

export const generateSantaAssignmentHTML = (data: AssignmentTemplateData): string => {
    
    return `
        <!DOCTYPE html>
        <html lang="uk">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ваш Таємний Санта!</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
                .header { background-color: #e31e24; color: white; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { padding: 20px 0; }
                .wishlist-box { border: 1px solid #ccc; padding: 15px; margin-top: 10px; background-color: #f9f9f9; border-left: 5px solid #e31e24; }
                h2 { color: #e31e24; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎅 Ваш Таємний Санта!</h1>
                </div>
                
                <div class="content">
                    <p>Вітаємо! Жеребкування відбулося, і ми раді повідомити вам, кому ви даруєте подарунок цього року.</p>
                    
                    <h2>🎁 Ваш Підопічний: ${data.recipientName}</h2>
                    
                    <p><strong>Список бажань:</strong></p>
                    <div class="wishlist-box">
                        ${data.wishList || 'Список бажань не був наданий.'}
                    </div>
                    
                    <p>Будь ласка, пам'ятайте про бюджет і терміни, встановлені організатором. Бажаємо веселих свят!</p>
                </div>
                
                <p style="text-align: center; color: #777; font-size: 0.9em;">Ваш Таємний Санта-Асистент.</p>
            </div>
        </body>
        </html>
    `;
};

export default generateSantaAssignmentHTML;