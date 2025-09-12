import React, { useState, FC } from "react";
import { createTheme, ThemeProvider, Box, Typography, Button, TextField, Paper, CssBaseline } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

// Define the custom theme based on the Potomac style guide
const potomacTheme = createTheme({
  palette: {
    mode: 'dark', // Set the mode to dark
    background: {
      default: '#2D3038',
      paper: '#2E3138',
    },
    primary: {
      main: '#D4AF37', // Potomac Gold
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#EAE5D7', // Cream Accent
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
    h1: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            borderRadius: 8,
            backgroundColor: '#2D3038',
            color: '#FFFFFF',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3b3e46',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D4AF37',
          },
          '& .MuiInputBase-input': {
            color: '#FFFFFF',
          },
          '& .MuiInputLabel-root': {
            color: '#EAE5D7',
          },
        },
      },
    },
  },
});

// Main App component
const App: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent("Potomac — Contact Inquiry");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:jake@potomacdb.com?subject=${subject}&body=${body}`;
  };

  return (
    <ThemeProvider theme={potomacTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, color: 'text.primary' }}>
        {/* Header */}
        <Box sx={{ width: '100%', maxWidth: 'md', display: 'flex', justifyContent: 'center', py: 3 }}>
          <Box
            component="img"
            src="https://placehold.co/100x40/D4AF37/2D3038?text=Potomac"
            alt="Potomac Logo"
            sx={{ height: '40px', width: 'auto', borderRadius: '8px' }}
          />
        </Box>

        {/* Main card */}
        <Box sx={{ maxWidth: 'sm', width: '100%', mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h1" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, mb: 2 }}>
              Learn more about Potomac
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Share your information and we will be in touch within two business days.
            </Typography>

            {/* Contact form */}
            <Box component="form" onSubmit={onSubmit} sx={{ display: 'grid', gap: 2 }}>
              <TextField
                label="Full name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                fullWidth
              />
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                fullWidth
              />
              <TextField
                label="Message"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you’re building…"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                startIcon={<MailOutlineIcon />}
                fullWidth
                sx={{ backgroundColor: 'primary.main', color: potomacTheme.palette.background.default, '&:hover': { backgroundColor: potomacTheme.palette.primary.light } }}
              >
                Send to jake@potomacdb.com
              </Button>
            </Box>
          </Paper>
        </Box>

        {/* Footer */}
        <Box sx={{ width: '100%', maxWidth: 'md', textAlign: 'center', py: 4, fontSize: '0.875rem', color: 'text.secondary' }}>
          © {new Date().getFullYear()} Potomac Database Systems, Inc.
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
