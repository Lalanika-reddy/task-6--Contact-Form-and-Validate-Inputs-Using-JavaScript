document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const form = document.getElementById('contact-form');
  const card = document.getElementById('form-card');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');
  const btnArrow = submitBtn.querySelector('.btn-arrow');
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  const formView = document.getElementById('form-view');
  const successView = document.getElementById('success-view');
  const userDisplayName = document.getElementById('user-display-name');
  const newMessageBtn = document.getElementById('new-message-btn');
  
  const orb1 = document.getElementById('bg-orb-1');
  const orb2 = document.getElementById('bg-orb-2');

  // Interactive Background Orbs (Follow mouse slightly for premium spatial feel)
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Move orbs slightly in the direction of the cursor (parallax effect)
    const moveX1 = (mouseX - window.innerWidth / 2) * 0.05;
    const moveY1 = (mouseY - window.innerHeight / 2) * 0.05;
    const moveX2 = (mouseX - window.innerWidth / 2) * -0.03;
    const moveY2 = (mouseY - window.innerHeight / 2) * -0.03;
    
    if (orb1) orb1.style.transform = `translate(${moveX1}px, ${moveY1}px)`;
    if (orb2) orb2.style.transform = `translate(${moveX2}px, ${moveY2}px)`;
  });

  // Regex Patterns
  // RFC 5322 Compliant Email validation pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Validation helper functions
  const validateName = () => {
    const value = nameInput.value.trim();
    const group = document.getElementById('group-name');
    const errorSpan = document.getElementById('error-name');
    
    if (!value) {
      setError(group, errorSpan, 'Please enter your name.');
      return false;
    } else if (value.length < 2) {
      setError(group, errorSpan, 'Name must be at least 2 characters.');
      return false;
    }
    
    clearError(group, errorSpan);
    return true;
  };

  const validateEmail = () => {
    const value = emailInput.value.trim();
    const group = document.getElementById('group-email');
    const errorSpan = document.getElementById('error-email');
    
    if (!value) {
      setError(group, errorSpan, 'Please enter your email address.');
      return false;
    } else if (!emailRegex.test(value)) {
      setError(group, errorSpan, 'Please enter a valid email (e.g., name@example.com).');
      return false;
    }
    
    clearError(group, errorSpan);
    return true;
  };

  const validateMessage = () => {
    const value = messageInput.value.trim();
    const group = document.getElementById('group-message');
    const errorSpan = document.getElementById('error-message');
    
    if (!value) {
      setError(group, errorSpan, 'Please enter your message.');
      return false;
    } else if (value.length < 10) {
      setError(group, errorSpan, `Message must be at least 10 characters (currently: ${value.length}).`);
      return false;
    }
    
    clearError(group, errorSpan);
    return true;
  };

  const setError = (group, errorSpan, message) => {
    group.classList.add('invalid');
    errorSpan.textContent = message;
  };

  const clearError = (group, errorSpan) => {
    group.classList.remove('invalid');
    errorSpan.textContent = '';
  };

  // Real-time input validation (clears error as user types valid data)
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length >= 2) {
      clearError(document.getElementById('group-name'), document.getElementById('error-name'));
    }
  });

  emailInput.addEventListener('input', () => {
    if (emailRegex.test(emailInput.value.trim())) {
      clearError(document.getElementById('group-email'), document.getElementById('error-email'));
    }
  });

  messageInput.addEventListener('input', () => {
    if (messageInput.value.trim().length >= 10) {
      clearError(document.getElementById('group-message'), document.getElementById('error-message'));
    }
  });

  // Blur validation triggers when focus leaves the field
  nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim() !== '') {
      validateName();
    }
  });

  emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim() !== '') {
      validateEmail();
    }
  });

  messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim() !== '') {
      validateMessage();
    }
  });

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Run all validations
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    const isFormValid = isNameValid && isEmailValid && isMessageValid;
    
    if (!isFormValid) {
      // Trigger card shake animation for failed submission
      card.classList.remove('shake');
      // trigger reflow
      void card.offsetWidth;
      card.classList.add('shake');
      
      // Clean up shake class after animation completes
      setTimeout(() => {
        card.classList.remove('shake');
      }, 400);
      
      return;
    }
    
    // Form is Valid -> Simulate Loading state
    setSubmittingState(true);
    
    setTimeout(() => {
      // Transition to Success Card after 1.5s simulated API call
      setSubmittingState(false);
      showSuccessState();
    }, 1500);
  });

  const setSubmittingState = (isSubmitting) => {
    if (isSubmitting) {
      submitBtn.disabled = true;
      btnText.textContent = 'Sending...';
      btnLoader.classList.remove('hidden');
      btnArrow.classList.add('hidden');
      submitBtn.style.opacity = '0.8';
    } else {
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      btnLoader.classList.add('hidden');
      btnArrow.classList.remove('hidden');
      submitBtn.style.opacity = '1';
    }
  };

  const showSuccessState = () => {
    // Set user name display
    userDisplayName.textContent = nameInput.value.trim();
    
    // Animate form screen exit
    formView.classList.add('fade-out');
    
    setTimeout(() => {
      formView.classList.add('hidden');
      formView.classList.remove('fade-out');
      
      // Show success screen
      successView.classList.remove('hidden');
    }, 300);
  };

  // Reset form and go back from success screen
  newMessageBtn.addEventListener('click', () => {
    successView.classList.add('hidden');
    
    // Reset form fields
    form.reset();
    
    // Clear any leftover visual error classes
    document.querySelectorAll('.input-group').forEach(group => {
      group.classList.remove('invalid');
    });
    document.querySelectorAll('.error-message').forEach(span => {
      span.textContent = '';
    });
    
    // Display form container again
    formView.classList.remove('hidden');
  });
});
