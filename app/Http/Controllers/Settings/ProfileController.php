<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'profile_photo' => [
                'required',
                File::image()
                    ->max('2mb')
                    ->dimensions(
                        Rule::dimensions()
                            ->maxWidth(2000)
                            ->maxHeight(2000)
                    ),
            ],
        ]);

        $user = $request->user();

        // Keep the previous photo path before uploading the replacement.
        $oldPhoto = $user->profile_photo_path;

        $path = $validated['profile_photo']->store('profile-photos', 'public');

        $user->update([
            'profile_photo_path' => $path,
        ]);

        // Delete the previous photo only after the new one is saved.
        if ($oldPhoto) {
            Storage::disk('public')->delete($oldPhoto);
        }

        return back()->with('success', 'Profile photo updated successfully.');
    }

    public function edit(): Response
    {
        return Inertia::render('settings/profile');
    }
}