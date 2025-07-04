<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOfferwallRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'sdk_key' => 'required|string|max:255',
            'placement' => 'required|string|max:255',
            'secret' => 'required|string|max:255',
            'reward_amount_param' => 'required|string|max:255',
            'user_id_param' => 'required|string|max:255',
            'offer_id_param' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048',
        ];
    }
}
