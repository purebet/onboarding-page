//swapType can be "SOL-->USDC", "USDC-->SOL", or "all"
//this can handle showing the widget when the appropriate <li> is clicked
const black = '#000814';
const grey = '#282828';
const blue = '#23B3FF';
const white = '#ffffff';

const tokensAll = {
    from: {
        bsc: ['0x0000000000000000000000000000000000000000','0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d','0xe9e7cea3dedca5984780bafc599bd69add087d56','0x55d398326f99059ff775485246999027b3197955','0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'],
        arbitrum: ['0x0000000000000000000000000000000000000000','0x82af49447d8a07e3bd95bd0d56f35241523fbab1','0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9','0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'],
        avalanche: ['0x0000000000000000000000000000000000000000', '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7'],
        solana: ['So11111111111111111111111111111111111111112', 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', '7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT', 'USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX'],
        ethereum: ['0x0000000000000000000000000000000000000000', '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0x6b175474e89094c44da98b954eedeac495271d0f', '0x853d955acef822db058eb8505911ed77f175b99e', '0xdac17f958d2ee523a2206206994597c13d831ec7'],
    },
    to: {
      solana: ['EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v']//, 'So11111111111111111111111111111111111111112'],
    }
}
const tokensUSDCtoSOL = {
    from: {
        solana: ['EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'],
    },
    to: {
        solana: ['So11111111111111111111111111111111111111112']//, 'So11111111111111111111111111111111111111112'],
    }
}
const tokensSOLtoUSDC = {
    from: {
        solana: ['So11111111111111111111111111111111111111112'],
    },
    to: {
        solana: ['EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v']//, 'So11111111111111111111111111111111111111112'],
    }
}

function loadMayan(domId, swapType){
    const config = {
        appIdentity: {
            name: swapType == 'all' ? 'Bridge to Solana USDC' : (swapType == 'USDC to SOL' ? 'Swap USDC to SOL' : 'Swap SOL to USDC'),
            icon: './halo_dark.png', //doesnt seem to work?
            uri: 'https://purebet.io',
        },
        rpcs:{
            solana: "https://old-warmhearted-friday.solana-mainnet.discover.quiknode.pro/80b04fea1c08b06bacdeef853e8d62aed9d78556/",
            ethereum: "https://eth.llamarpc.com",
            arbitrum: "https://arbitrum.blockpi.network/v1/rpc/public",
            avalanche: "https://avalanche.blockpi.network/v1/rpc/public",
            bsc: "https://bsc-mainnet.public.blastapi.io",
        },
        sourceChains: swapType != 'all' ? ['solana'] : ['ethereum', 'arbitrum', 'avalanche', 'solana', 'bsc'],
        destinationChains: ['solana'],
        tokens: swapType == 'all' ? tokensAll : (swapType == 'USDC to SOL' ? tokensUSDCtoSOL : tokensSOLtoUSDC),
        colors: {
            N100:black,//arrow and pop out bgs
            N300:black,//outlines, chain buttons, source token button
            N500:white,//inactive button colour
            N600:white,//numbers
            N700:blue,//arrow 
            N900:white,//text
            primary:blue,//button backgrounds
            mainBox:black,//main box
            transparentBg:grey,//qty input boxes
        },
        defaultGasDrop: {
            solana: 0.1,
          },
        referrerAddress: 'DpGzaEHHKnaepTDeLuRn76vgyfvCHVJkaH9S9zpPcB9V',
    };
    MayanSwap.init(domId, config);
}

var idToType = {
    blockchain: "all",
    blockchain2: "USDC to SOL",
    exchange: "SOL to USDC"
};

var currentDropdownId;
function toggleShow(id){
    var el = document.getElementById(id)
    var oldClass = el.classList[0];
    var newClass = oldClass == "collapsed" ? "show" : "collapsed";
    el.className = newClass + " dropdown";
    console.log("curr id:", currentDropdownId)
    if(newClass == "show"){
        // Close the currently opened dropdown (if any)
        if (currentDropdownId && currentDropdownId != id) {
            if(currentDropdownId == "blockchain" && id == "blockchain2"){}else{
                var currentEl = document.getElementById(currentDropdownId);
                currentEl.className = "collapsed dropdown";
                document.getElementById(currentDropdownId + "DropDown").setAttribute("style", "display:none;");
                if (idToType[currentDropdownId]) {
                    var widget = document.getElementById(currentDropdownId + "WidgetContainer");
                    widget.innerText = "";
                }
            }
        }
        // Open the new dropdown
        document.getElementById(id + "DropDown").setAttribute("style", "display:visible;");
        console.log("id about to set to curr:", id)
        if(id != "blockchain2"){currentDropdownId = id;}
        console.log("should match above:", currentDropdownId)
        if(idToType[id] != null && id != "blockchain2"){
            var parentDiv = document.getElementById(id + "WidgetContainer");
            var widgetContainer = document.createElement("div");
            widgetContainer.id = id +"Widget";
            widgetContainer.className = "widget";
            widgetContainer.onclick = function() { loadMayan(id+"Widget", idToType[id]) };
            parentDiv.appendChild(widgetContainer);
        
            loadMayan(id + "Widget", idToType[id]);
        }
    }
    else{
        document.getElementById(id + "DropDown").setAttribute("style", "display:none;");
        
        if(idToType[id] != null){
            var widget = document.getElementById(id+" Widget");
            widget.innerText = "";
            //widget.remove();
        }
        currentDropdownId = null;

    }
}


// function addWidget(id, parentDiv) {
//     var widgetContainer = document.createElement("div");
//     widgetContainer.id = id +" Widget";
//     widgetContainer.className = "widget";
//     widgetContainer.onclick = function() { loadMayan(id+" Widget", idToType[id]) };
//     parentDiv.appendChild(widgetContainer);
  
//     loadMayan(id + " Widget", idToType[id]); // Call your initialization function again
//   }

//   function addWidget(parentDiv) {
//     // Create new widget element
//     var widgetDiv = document.createElement("div");
//     widgetDiv.id = "blockchainWidget";
//     widgetDiv.classList.add("widget");
  
//     // Add click listener to widget
//     widgetDiv.addEventListener("click", function() {
//       loadMayan(widgetDiv.id, "all");
//     });
  
//     // Add widget element to parent div
//     parentDiv.appendChild(widgetDiv);
//   }