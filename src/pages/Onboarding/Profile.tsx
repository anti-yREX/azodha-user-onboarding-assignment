import { useState, type FormEvent, type ChangeEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateProfile, setProfileDone, selectProfile } from '@/store/onboardingDataSlice';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age?.toString() || '');
  const [email, setEmail] = useState(profile.email);
  const [profilePic, setProfilePic] = useState<string | null>(profile.profilePic);
  const [errors, setErrors] = useState<{ name?: string; age?: string; email?: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    dispatch(updateProfile({ name: value }));
    if (errors.name) {
      setErrors({ ...errors, name: undefined });
    }
  };

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAge(value);
    const ageNum = value === '' ? null : parseInt(value, 10);
    dispatch(updateProfile({ age: ageNum }));
    if (errors.age) {
      setErrors({ ...errors, age: undefined });
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    dispatch(updateProfile({ email: value }));
    if (errors.email) {
      setErrors({ ...errors, email: undefined });
    }
  };

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfilePic(result);
        dispatch(updateProfile({ profilePic: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string; age?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!age) {
      newErrors.age = 'Age is required';
    } else {
      const ageNum = parseInt(age, 10);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 150) {
        newErrors.age = 'Age must be between 1 and 150';
      }
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(setProfileDone(true));
      navigate('/onboarding/favorite-songs');
    }
  };

  const isFormValid = name.trim() && age && email.trim();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Personal Profile</h2>
        <p className="text-muted-foreground">
          Step 1: Enter your personal information
        </p>
      </div>
      
      <form onSubmit={handleNext} className="space-y-6">
        <div className="p-6 border border-border rounded-lg bg-card space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Name <span className="text-destructive">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Age Field */}
          <div className="space-y-2">
            <label htmlFor="age" className="block text-sm font-medium">
              Age <span className="text-destructive">*</span>
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={handleAgeChange}
              min="1"
              max="150"
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              placeholder="Enter your age"
            />
            {errors.age && (
              <p className="text-sm text-destructive">{errors.age}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email <span className="text-destructive">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Profile Picture Field */}
          <div className="space-y-2">
            <label htmlFor="profilePic" className="block text-sm font-medium">
              Profile Picture
            </label>
            <input
              ref={fileInputRef}
              id="profilePic"
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
            />
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 border border-input rounded-md bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                {profilePic ? 'Change Picture' : 'Upload Picture'}
              </button>
              {profilePic && (
                <div className="relative">
                  <img
                    src={profilePic}
                    alt="Profile preview"
                    className="w-20 h-20 object-cover rounded-md border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setProfilePic(null);
                      dispatch(updateProfile({ profilePic: null }));
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs hover:bg-destructive/90"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Max file size: 5MB. Supported formats: JPG, PNG, GIF
            </p>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isFormValid}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:shadow-md active:scale-[0.98]"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
