<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Spatie\Permission\Models\Role;

#[Signature('app:create-administrator')]
#[Description('Create the initial MVX Business Suite administrator account')]
class CreateAdministrator extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        // Prevent accidentally creating another initial administrator.
        if (User::role('System Administrator', 'web')->exists()) {
            $this->error('An Administrator account already exists.');

            return self::FAILURE;
        }

        // Retrieve the Administrator role.
        $role = Role::query()
            ->where('name', 'System Administrator')
            ->where('guard_name', 'web')
            ->first();

        if (! $role) {
            $this->error('Administrator role not found. Run the database seeder first.');

            return self::FAILURE;
        }

        $this->info('Create Initial Administrator Account');
        $this->newLine();

        $name = trim($this->ask('Administrator name'));
        $email = Str::lower(trim($this->ask('Administrator email')));

        // Secret prompts prevent passwords from appearing in the terminal.
        $password = $this->secret('Administrator password');
        $passwordConfirmation = $this->secret('Confirm administrator password');

        $validator = Validator::make([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $passwordConfirmation,
        ], [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email'),
            ],
            'password' => [
                'required',
                'string',
                'confirmed',
                Password::defaults(),
            ],
        ]);

        if ($validator->fails()) {
            $this->error($validator->errors()->first());

            return self::FAILURE;
        }

        $user = DB::transaction(function () use ($name, $email, $password, $role) {
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => $password,
                'is_active' => true,
            ]);

            // Mark the initial administrator's email as verified.
            $user->forceFill([
                'email_verified_at' => now(),
            ])->save();

            $user->assignRole($role);

            return $user;
        });

        $this->newLine();
        $this->info('Administrator account created successfully!');
        $this->line("Name: {$user->name}");
        $this->line("Email: {$user->email}");
        $this->line('Account status: Active');
        $this->line('Assigned role: System Administrator');

        return self::SUCCESS;
    }
}