import React, { useState, useEffect } from "react";
import { useScramble } from "use-scramble";

const Component = () => {
  const names = ["Welcome to Xeotec E-Services Private Limited", "ज़ीओटेक ई-सर्विसेज प्राइवेट लिमिटेड में आपका स्वागत है","জিওটেক ই-চাৰ্ভিচেছ প্ৰাইভেট লিমিটেডলৈ আপোনাক স্বাগতম","জিওটেক ই-সার্ভিসেস প্রাইভেট লিমিটেডে স্বাগতম"];
  const [currentNameIndex, setCurrentNameIndex] = useState(0);

  // Hook returns a ref
  const { ref, setText } = useScramble({
    text: names[currentNameIndex],
    speed: 0.5,
    tick: 1,
    step: 1,
    scramble: 3,
    seed: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Change the index to display the next name
      setCurrentNameIndex((prevIndex) => (prevIndex + 1) % names.length);
      setText(names[currentNameIndex]);
    }, 6000); // Change the name every 3 seconds

    return () => clearInterval(interval);
  }, [currentNameIndex, names, setText]);

  // Apply the ref to a node
  return <h1 ref={ref} />;
};

export default Component;
