import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		backgroundSize: {
			'200%': '200% 200%', // for gradient movement
		  },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		transitionTimingFunction: {
  			'spring': 'cubic-bezier(0.4, 0, 0.2, 1)',
  		},
  		keyframes: {
  			"fade-up": {
  				"0%": {
  					opacity: "0",
  					transform: "translateY(10px)"
  				},
  				"100%": {
  					opacity: "1",
  					transform: "translateY(0)"
  				}
  			},
  			"fade-down": {
  				"0%": {
  					opacity: "0",
  					transform: "translateY(-10px)"
  				},
  				"100%": {
  					opacity: "1",
  					transform: "translateY(0)"
  				}
  			},
  			"scale-up": {
  				"0%": {
  					opacity: "0",
  					transform: "scale(0.95)"
  				},
  				"100%": {
  					opacity: "1",
  					transform: "scale(1)"
  				}
  			},
			  'gradient-x': {
				'0%, 100%': { backgroundPosition: '0% 50%' },
				'50%': { backgroundPosition: '100% 50%' },
			  },
  		},
  		animation: {
  			"fade-up": "fade-up 0.5s ease-out",
  			"fade-down": "fade-down 0.5s ease-out",
  			"scale-up": "scale-up 0.3s ease-out",
			'gradient-x': 'gradient-x 20s ease-in-out infinite',
  		}
  	}
  },
  plugins: [animate],
};
export default config;
