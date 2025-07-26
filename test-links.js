const { chromium } = require('playwright');
const path = require('path');

(async () => {
    // Launch browser
    const browser = await chromium.launch({ 
        headless: false,  // Set to true to run in background
        slowMo: 500      // Slow down actions to see what's happening
    });
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Enable console logging
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    
    // Monitor new page/tab creation
    context.on('page', async (newPage) => {
        console.log('Nueva pestaña abierta:', await newPage.url());
        await newPage.close(); // Close the new tab to continue testing
    });
    
    try {
        // Load the local HTML file
        const filePath = `file://${path.resolve(__dirname, 'index.html')}`;
        console.log('Cargando:', filePath);
        await page.goto(filePath);
        
        // Wait for page to load and scripts to execute
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);
        
        // Check if scripts loaded
        const hasButton = await page.$('#buy-tickets');
        console.log('Botón principal existe:', !!hasButton);
        
        console.log('\n=== Probando botón principal "Comprar Boletos" ===');
        // Test main hero button
        const heroButton = await page.$('#buy-tickets');
        if (heroButton) {
            console.log('Botón encontrado, haciendo clic...');
            
            // Set up promise to catch navigation or new page
            const [response] = await Promise.all([
                page.waitForNavigation({ timeout: 5000 }).catch(() => null),
                heroButton.click()
            ]);
            
            if (response) {
                console.log('Navegación detectada a:', page.url());
            } else {
                console.log('No hubo navegación (posiblemente bloqueado o nueva pestaña)');
            }
            
            // Check if we're still on the same page
            if (page.url().includes('file://')) {
                console.log('Todavía en la página local');
                await page.goBack().catch(() => {});
            }
        }
        
        await page.waitForTimeout(1000);
        
        console.log('\n=== Probando botón de tarjeta de evento ===');
        // Test event card button
        const eventButton = await page.$('.event-btn');
        if (eventButton) {
            console.log('Botón de evento encontrado, haciendo clic...');
            
            const [response] = await Promise.all([
                page.waitForNavigation({ timeout: 5000 }).catch(() => null),
                eventButton.click()
            ]);
            
            if (response) {
                console.log('Navegación detectada a:', page.url());
            } else {
                console.log('No hubo navegación (posiblemente bloqueado o nueva pestaña)');
            }
        }
        
        console.log('\n=== Prueba completada ===');
        console.log('URL final:', page.url());
        
    } catch (error) {
        console.error('Error durante la prueba:', error);
    } finally {
        await page.waitForTimeout(3000); // Wait to see results
        await browser.close();
    }
})();