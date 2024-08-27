# overt[AI]king

This is a self-driving car simulation built using JavaScript with no libraries. The cars use a basic neural network to make decisions based on the input from the sensors.

![overt[AI]king](https://github.com/ngopimas/overtAIking/blob/master/overtaiking.gif?raw=true)

## How to Play

- Cars moves forward automatically.
- Visualize the sensors on the front of the car & the neural network on the right side of the screen.
- Save the best car model by clicking the `💾 Save` button.
- Delete the saved model by clicking the `🗑️ Delete` button.
- Restart the game by clicking the `↻ Restart` button. It will use a saved model if available.
- Choose your preferred racing team with the top dropdown.

## Load a Pre-Trained Model

Follow these steps to add a key-value pair to your browser local storage.

1. **Open the Web Page:**
   - Live url: https://ngopimas.github.io/overtAIking/

2. **Open the Browser Console:**
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (Mac) to open the developer tools.
   - Go to the "Console" tab.

3. **Insert the Following Code:**

    ```javascript
    const key = 'bestCar'
    const value = {"levels":[{"inputs":[0,0,0,0,0.3184778655937832],"outputs":[1,1,0,1,0,0],"biases":[-0.09101998863591773,-0.3134285761018806,0.048069572988299,-0.19392853902492707,0.04607013744129699,0.39785124466947297],"weights":[[-0.44181144035394876,-0.020587869434841387,0.22612812858936354,-0.011462274843862329,-0.2641818632911116,-0.32300239917929907],[0.16821881436230135,-0.36849103809514133,0.014328529632692932,0.36810851605819295,-0.1767936329005123,-0.28964616568508944],[-0.1063600297374241,-0.11552334109675848,0.14742291206920866,0.3198338818136533,-0.14997940155764317,0.20090692511785768],[0.034956753575206674,0.04305423986277622,0.1587108083835079,-0.24345969774019985,0.05684137287313741,-0.37289143479138837],[0.17181269594781534,0.20581706272256217,0.13892610409717415,0.21477776307612967,-0.2257936628739376,-0.29959391548260106]]},{"inputs":[1,1,0,1,0,0],"outputs":[1,1,1,0],"biases":[-0.2240824142943649,0.1527097727922228,-0.2806828607808831,0.1860438198483803],"weights":[[0.020780120577217412,0.4002989241449479,-0.4778884303356248,0.035301291270861526],[-0.03536496927310443,-0.34606169921413604,0.3395019415765539,-0.08844486030699936],[-0.08013196218969684,-0.19871411361970065,-0.26323226185899956,-0.0925649866106519],[0.01616942475577693,0.3078402616612731,-0.016830239235824856,0.13266843642946938],[0.00263524363156456,-0.08318406965751744,-0.011691287796070454,0.20567565568357654],[0.31438211220587164,0.04203468995046224,0.37898471239414955,0.02189503185439498]]}]};
    
    localStorage.setItem(key, value);
    ```

4. **Viewing Local Storage in DevTools:**
   - Go to the “Application” tab in developer tools.
   - Under “Storage,” click on “Local Storage.”
   - Select the proper page from the dropdown, and you should see the key and value you just added.

5. **Removing the Key-Value Pair:**
   - If you want to remove the key-value pair from the local storage, run the following code in the console:
    
    ```javascript
    localStorage.removeItem(key);
    ```
   - You might prefer to use the `🗑️ Delete` button in the web page instead.

## Credits

Based on https://github.com/gniziemazity/Self-driving-car
